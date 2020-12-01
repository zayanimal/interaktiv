import {
    PipeTransform,
    Injectable,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class SearchPipe implements PipeTransform {
    transform(value: string) {
        if (/'|"|^\s*$/g.test(value)) {
            throw new BadRequestException('Строка не может быть пустой или содержать кавычки');
        }

        return value;
    }
}
