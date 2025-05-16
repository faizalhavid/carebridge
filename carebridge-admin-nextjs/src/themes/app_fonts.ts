import { appColors } from './app_colors';

interface TextStyle {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    letterSpacing?: number;
    decoration?: 'underline' | 'line-through' | 'none';
    fontStyle?: 'normal' | 'italic' | 'oblique';
}

class AppFonts {
    readonly fontSize?: number;
    readonly fontWeight?: string;
    readonly color?: string;
    readonly decoration?: 'underline' | 'line-through' | 'none';
    readonly fontStyle?: 'normal' | 'italic' | 'oblique';

    private constructor(
        fontSize?: number,
        fontWeight?: string,
        color?: string,
        decoration?: 'underline' | 'line-through' | 'none',
        fontStyle?: 'normal' | 'italic' | 'oblique'
    ) {
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.color = color;
        this.decoration = decoration;
        this.fontStyle = fontStyle;
    }

    static create(
        fontSize?: number,
        fontWeight?: string,
        color?: string,
        decoration?: 'underline' | 'line-through' | 'none',
        fontStyle?: 'normal' | 'italic' | 'oblique'
    ): AppFonts {
        return new AppFonts(fontSize, fontWeight, color, decoration, fontStyle);
    }

    copyWith(updateValues: Partial<AppFonts>): AppFonts {
        return new AppFonts(
            updateValues.fontSize ?? this.fontSize,
            updateValues.fontWeight ?? this.fontWeight,
            updateValues.color ?? this.color,
            updateValues.decoration ?? this.decoration,
            updateValues.fontStyle ?? this.fontStyle
        );
    }

    get ts(): TextStyle {
        return {
            fontSize: this.fontSize ?? 14,
            fontWeight: this.fontWeight ?? 'normal',
            color: this.color ?? appColors.neutral[80],
            letterSpacing: 0,
            decoration: this.decoration ?? 'none',
            fontStyle: this.fontStyle ?? 'normal',
        };
    }

    // Color Methods
    customColor(color: string): AppFonts {
        return this.copyWith({ color });
    }

    get placeholder(): AppFonts {
        return this.copyWith({ color: appColors.neutral[50] });
    }

    get text(): AppFonts {
        return this.copyWith({ color: appColors.neutral[80] });
    }

    get light(): AppFonts {
        return this.copyWith({ color: appColors.neutral[60] });
    }

    get gray(): AppFonts {
        return this.copyWith({ color: appColors.neutral[70] });
    }

    get disabled(): AppFonts {
        return this.copyWith({ color: appColors.neutral[40] });
    }

    get primary(): AppFonts {
        return this.copyWith({ color: appColors.primary[500] });
    }

    get secondary(): AppFonts {
        return this.copyWith({ color: appColors.secondary[500] });
    }

    get white(): AppFonts {
        return this.copyWith({ color: appColors.neutral[0] });
    }

    get info(): AppFonts {
        return this.copyWith({ color: appColors.info[20] });
    }

    get success(): AppFonts {
        return this.copyWith({ color: appColors.success[20] });
    }

    get warning(): AppFonts {
        return this.copyWith({ color: appColors.warning[20] });
    }

    get error(): AppFonts {
        return this.copyWith({ color: appColors.error[20] });
    }

    // Decoration Methods
    customWeight(fontWeight: string): AppFonts {
        return this.copyWith({ fontWeight });
    }

    get bold(): AppFonts {
        return this.copyWith({ fontWeight: 'bold' });
    }

    get semibold(): AppFonts {
        return this.copyWith({ fontWeight: '600' });
    }

    get underline(): AppFonts {
        return this.copyWith({ decoration: 'underline' });
    }

    get italic(): AppFonts {
        return this.copyWith({ fontStyle: 'italic' });
    }

    // Font Size Methods
    customSize(fontSize: number): AppFonts {
        return this.copyWith({ fontSize });
    }

    get captionSmall(): AppFonts {
        return this.copyWith({ fontSize: 8 });
    }

    get caption(): AppFonts {
        return this.copyWith({ fontSize: 12 });
    }

    get body(): AppFonts {
        return this.copyWith({ fontSize: 14 });
    }

    get subtitle(): AppFonts {
        return this.copyWith({ fontSize: 18 });
    }

    get titleSmall(): AppFonts {
        return this.copyWith({ fontSize: 24 });
    }

    get title(): AppFonts {
        return this.copyWith({ fontSize: 32 });
    }
}

export const appFonts = AppFonts.create();


// example usage
// const styles = appFonts
//     .customSize(16)
//     .customWeight('bold')
//     .customColor(AppColors.primary[500])
//     .customDecoration('underline')
//     .customStyle('italic')
//     .ts;

// console.log(styles); // { fontSize: 16, fontWeight: 'bold', color: 'var(--color-primary-500)', letterSpacing: 0, decoration: 'underline', fontStyle: 'italic' }

// const styles2 = appFonts
//     .body
//     .bold
//     .primary
//     .underline
//     .italic