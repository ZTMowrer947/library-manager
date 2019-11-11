// Imports
import { IsNotEmpty, IsInt } from "class-validator";

// DTO
export default class BookDTO {
    @IsNotEmpty({ message: "Title is a required field." })
    public title!: string;

    @IsNotEmpty({ message: "Author is a required field." })
    public author!: string;

    public genre?: string;

    @IsInt({ message: "Year must be an integer" })
    public year?: number;
}
