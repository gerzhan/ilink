import { createId } from '@paralleldrive/cuid2';
import * as Domain from './../../../../@domain';

export class User implements Domain.User {
  id: string;
  name: string;

  // TODO: perf - set type for DTO
  constructor(dto?: any) {
    this.id = dto.id ?? createId();
    this.name = dto.name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
