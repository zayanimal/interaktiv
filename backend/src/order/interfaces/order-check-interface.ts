import { Observable } from "rxjs";
import { UserDto } from "@users/dto/user.dto";

interface ICheckUser { userId: string; companyId: string; }

export interface ICheckOrderService {
    /**
     * Проверить существование пользователя и компании
     * @param user юзер из реквеста
     */
    checkUser(user: UserDto): Observable<ICheckUser>
}
