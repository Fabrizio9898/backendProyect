
// import { Reflector } from '@nestjs/core';

// export const Roles = Reflector.createDecorator<string[]>();



//Este enfoque es mucho más limpio y más legible, y se parece un poco a la Reflector#createDecoratorenfoque. La diferencia es que con @SetMetadatatienes más control sobre la clave de metadatos y el valor, y también puedes crear decoradores que se llevan más de un argumento.


import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

