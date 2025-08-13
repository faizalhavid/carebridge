package com.carebridge.carebridge_api.core;

import java.lang.reflect.InvocationTargetException;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/**
 * BaseMapper menyediakan helper umum untuk konversi antar DTO dan Entity
 * pada relasi berbasis ID atau object.
 * <p>
 * Tujuan: menghindari boilerplate mapping di setiap mapper yang menggunakan
 * MapStruct.
 *
 * @param <E>         Entity utama
 * @param <DRequest>  DTO Request (input)
 * @param <DResponse> DTO Response (output)
 */
public interface BaseMapper<E, DRequest, DResponse> {
    /**
     * Patch entity dengan data dari DTO.
     * <p>
     * Hanya properti yang ada di DTO yang akan diupdate, properti lain di entity
     * akan tetap utuh.
     *
     * @param dto    Data transfer object yang berisi data baru
     * @param entity Entity yang akan diupdate
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void patch(DRequest dto, @MappingTarget E entity);

    /**
     * Konversi dari ID (Long) ke Entity dengan hanya mengisi field id.
     * <p>
     * Cocok untuk kasus:
     * <ul>
     * <li>DTO hanya mengirimkan ID relasi (misal: roleId)</li>
     * <li>Tidak perlu memuat data relasi penuh</li>
     * </ul>
     *
     * <pre>
     * Contoh penggunaan di MapStruct:
     *
     * {@code
     * &#64;Mapping(target = "role", expression = "java(toEntityFromId(dto.getRoleId(), Role.class))")
     * }
     * </pre>
     */
    default <T> T toEntityFromId(Long id, Class<T> type) {
        if (id == null)
            return null;
        try {
            T instance = type.getDeclaredConstructor().newInstance();
            type.getMethod("setId", Long.class).invoke(instance, id);
            return instance;
        } catch (NoSuchMethodException | InstantiationException | IllegalAccessException
                | InvocationTargetException e) {
            throw new RuntimeException("Gagal membuat instance " + type.getSimpleName() + " dari ID", e);
        }
    }

    /**
     * Konversi dari DTO yang bisa berupa:
     * <ul>
     * <li>Hanya ID (field id terisi, field lain kosong)</li>
     * <li>Object penuh untuk create/update</li>
     * </ul>
     * <p>
     * Jika hanya ID yang diberikan, method akan membuat entity dengan id saja.
     * Jika object penuh, mapping akan didelegasikan ke mapper relasi yang
     * diberikan.
     *
     * <pre>
     * Contoh penggunaan di MapStruct:
     *
     * {@code
     * &#64;Mapping(target = "role", expression = "java(toEntityFromIdOrObject(dto.getRole(), Role.class, roleMapper))")
     * }
     * </pre>
     *
     * @param request   DTO relasi (punya getId())
     * @param entityCls Class entity tujuan
     * @param mapper    Mapper relasi untuk mapping object penuh
     */
    default <T, RQ> T toEntityFromIdOrObject(RQ request, Class<T> entityCls, BaseMapper<T, RQ, ?> mapper) {
        if (request == null)
            return null;

        try {
            var getIdMethod = request.getClass().getMethod("getId");
            Object idValue = getIdMethod.invoke(request);

            // Cek apakah semua properti selain id null/blank
            boolean onlyId = true;
            for (var m : request.getClass().getMethods()) {
                if (m.getName().startsWith("get") && !m.getName().equals("getId")) {
                    Object val = m.invoke(request);
                    if (val != null && !(val instanceof String s && s.isBlank())) {
                        onlyId = false;
                        break;
                    }
                }
            }

            // Jika hanya ID → buat entity dengan id saja
            if (idValue != null && onlyId) {
                return toEntityFromId((Long) idValue, entityCls);
            }

            // Jika object penuh → mapping pakai mapper relasi
            return mapper.toEntity(request);

        } catch (NoSuchMethodException e) {
            throw new IllegalArgumentException("DTO tidak memiliki method getId()", e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    E toEntity(DRequest dto);

    DResponse toResponse(E entity);
}
