import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User, UserInfo, UsersRepository } from '../../../@modules/users';
import {
  CreatingNewUserUsecase,
  DeletingUser,
  FindAllUsersUsecase,
  FindUserInfoUsecase,
} from '../../../@modules/users/usecase';
import { TOKEN_USERS_REPOSITORY } from '../../../@core/constants';
import { UserInfoDto } from './dto/user-info.dto';
import { FindUserUsecase } from '../../../@modules/users/usecase/find-user.usecase';

@ApiTags('Users')
@Controller('rest/users')
export class UsersController {
  constructor(
    @Inject(TOKEN_USERS_REPOSITORY)
    private readonly userRepository: UsersRepository
  ) {}

  @Post()
  @ApiExtraModels(UserDto)
  @ApiResponse({
    description: 'добавленный пользователь',
    status: 201,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const createUserUseCase = new CreatingNewUserUsecase(this.userRepository);
    return new Promise((resolve, reject) => {
      try {
        createUserUseCase.execute(createUserDto, (model: User) =>
          resolve(model.toJSON())
        );
      } catch (error) {
        reject();
      }
    });
  }

  @Get()
  @ApiExtraModels(UserDto)
  @ApiResponse({
    description: 'список всех пользователей',
    status: 200,
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(UserDto) },
    },
  })
  findAll() {
    const findAllUsersUseCase = new FindAllUsersUsecase(this.userRepository);
    return new Promise((resolve, reject) => {
      try {
        findAllUsersUseCase.execute((models: User[]) =>
          resolve(models.map((model) => model.toJSON()))
        );
      } catch (error) {
        reject();
      }
    });
  }

  @Get(':id')
  @ApiExtraModels(UserDto)
  @ApiResponse({
    description: 'Данные пользователя (основные)',
    status: 200,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  findUser(@Param('id') id: string) {
    const findAllUsers = new FindUserUsecase(this.userRepository);
    return new Promise((resolve, reject) => {
      try {
        findAllUsers.execute(id, (model: User) => resolve(model.toJSON()));
      } catch (error) {
        reject();
      }
    });
  }

  @Get(':id/info')
  @ApiExtraModels(UserInfoDto)
  @ApiResponse({
    description: 'Данные пользователя (расширенная информация)',
    status: 200,
    schema: {
      $ref: getSchemaPath(UserInfoDto),
    },
  })
  findUserInfo(@Param('id') id: string) {
    const findUserInfo = new FindUserInfoUsecase(this.userRepository);
    return new Promise((resolve, reject) => {
      try {
        findUserInfo.execute(id, (model: UserInfo) => resolve(model.toJSON()));
      } catch (error) {
        reject();
      }
    });
  }
  // TODO: feat
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    const deleteUser = new DeletingUser(this.userRepository);
    return new Promise((resolve, reject) => {
      try {
        deleteUser.execute(id, (deletedId: string) => resolve(deletedId));
      } catch (error) {
        reject();
      }
    });
  }
}
