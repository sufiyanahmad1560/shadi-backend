import { config } from "../common/config";
import { ConflictError } from "../common/errors/conflict-error";
import { InternalServerError } from '../common/errors/internal-server-error';
import { AuthUserDto, CreateUserDto } from "../dto/user.dto";
import { UserRepository, userRepository } from "../repository/user.repository";
import { AuthService, authService } from "./auth.service";

// Business Logic
export class UserService {

    constructor(private userRepository: UserRepository,
        private authService: AuthService) {

    }

    async createUser(user: CreateUserDto) {
        const existingMail = await userRepository.findOneByEmail(user.email);
        // Email already exists, return 409 Conflict status code
        if (existingMail) return new ConflictError('Email id already used');
        console.log('existing email', existingMail)
        const existingMobile = await userRepository.findOneByMobile(user.mobile);
        // Mobile already exists, return 409 Conflict status code
        if (existingMobile) return new ConflictError('Mobile number already used');
        console.log('existing mobile', existingMobile)

        user.password = await this.authService.pwdToHash(user.password);
        console.log('pwd hashed')

        const newUser = await this.userRepository.saveUser(user);
        if (!newUser) return new InternalServerError(`Internal server error, userService-line36: ${newUser}`);

        console.log('user saved')

        const token = await this.authService.generateJwt({ email: newUser.email, userId: newUser._id }, config.jwtKey, config.jwtExpiresIn);
        if (!newUser) return new InternalServerError(`Internal server error, userService-line40: ${token}`);
        console.log('token genrated')

        return { token, id: newUser._id, name: newUser.name, email: newUser.email, mobile: newUser.mobile, role: newUser.role };

    }

}

export const userService = new UserService(userRepository, authService);