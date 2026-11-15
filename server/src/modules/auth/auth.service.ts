import bcrypt from 'bcryptjs';
import { UserModel, IUser } from '../users/user.model';
import { RegisterDTO, LoginDTO, AuthResponse } from './auth.types';
import { generateToken } from '../../utils/token.util';

export class AuthService {
  static async register(dto: RegisterDTO): Promise<AuthResponse> {
    const existing = await UserModel.findOne({ email: dto.email });
    if (existing) {
      throw new Error('A user with this email address already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user: IUser = await UserModel.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      gender: dto.gender,
      interests: dto.interests || [],
      role: dto.role || 'user',
    });

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  static async login(dto: LoginDTO): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email: dto.email });
    if (!user) {
      throw new Error('Invalid email or password credentials.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password credentials.');
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }
}
