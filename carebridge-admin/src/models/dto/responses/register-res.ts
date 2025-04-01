import { Biodata } from "../../biodata";
import { User } from "../../user";

export interface RegisterResponse {
    user: User;
    biodata?: Biodata | undefined;
}