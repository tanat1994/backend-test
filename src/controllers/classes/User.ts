import { UserEntity } from '../../entities/User.entity';
import { IUser } from '../../interfaces/user.interface';
import { IAuthResponse } from '../../interfaces/response.interface';
import AppDataSource from '../../services/db.service';
import generator from 'generate-password';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class User implements IUser {
    private _userId: number;
    username: string;
    password?: string;
    readonly saltRound: number;

    constructor (username: string, password?: string) {
        this.username = username;
        this.password = password;
        this.saltRound = 10;
    }

    private _generateRandomPassword () : string {
        return generator.generate({ length: 6, numbers: true, });
    }

    private _hashPassword (plainPassword: string) : string {
        return bcrypt.hashSync(plainPassword, this.saltRound);
    }

    private _isHashMatched (inputPassword: string, dbPassword: string) {
        return bcrypt.compareSync(inputPassword, dbPassword);
    }

    private _createJWTToken () {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
        const token = jwt.sign({ username: this.username, userId: this._userId }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        return token;
    }

    private async _createNewUser (): Promise<IAuthResponse> {
        try {
            const userRepository = await AppDataSource.getRepository(UserEntity);
            const newUser = new UserEntity();
            const randomPassword = this._generateRandomPassword();
            newUser.username = this.username;
            newUser.password = this._hashPassword(randomPassword);
            await userRepository.save(newUser);
            return {
                status: 200,
                message: 'Register Sucessfully',
                password: randomPassword,
            }
        } catch(e: any) {
            return {
                status: 500,
                message: 'Cannot create new user',
                errorMessage: e.message,
            }
        }
    }

    public async register (): Promise<IAuthResponse> {
        const userRepository = await AppDataSource.getRepository(UserEntity);
        const userDatasource = await userRepository.findOne({
            where: {
                username: this.username
            },
        });
        if (userDatasource) {
            return {
                status: 400,
                message: 'Username is already exists',
            }
        }
        return await this._createNewUser();
    }

    public async login () : Promise<IAuthResponse>{
        const userRepository = await AppDataSource.getRepository(UserEntity);
        const userDatasource = await userRepository.findOne({
            where: {
                username: this.username,
            },
        });
        if (userDatasource) {
            this._userId = userDatasource?.id; 
            if (this._isHashMatched(this.password as string, userDatasource.password)) {
                const token = this._createJWTToken();
                userDatasource.token = token;
                await userRepository.save(userDatasource);
                return {
                    status: 200,
                    message: 'Login successfully',
                    accessToken: token,
                }
            }
        }
        return {
            status: 401,
            message: 'Username or Password not matched',
        }
    }
}

export default User;