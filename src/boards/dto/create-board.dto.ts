import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty() //pipe
    title: string;

    @IsNotEmpty()
    description: string;
}