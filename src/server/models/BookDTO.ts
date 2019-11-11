// Imports
import { IsNotEmpty, IsInt, ValidateIf } from "class-validator";

// DTO
export default class BookDTO {
    @IsNotEmpty({ message: "Title is a required field." })
    public title!: string;

    @IsNotEmpty({ message: "Author is a required field." })
    public author!: string;

    public genre?: string;

    @ValidateIf(o => !!o.year)
    @IsInt({ message: "Year must be an integer" })
    public year?: number;
}
