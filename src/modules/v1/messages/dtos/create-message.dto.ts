import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(10000, { message: 'Description must not exceed 10,000 characters.' })
    text: string;

    @IsNotEmpty()
    @IsString()
    authorClerkId: string;

    @IsNotEmpty()
    publicationId: number;
}
