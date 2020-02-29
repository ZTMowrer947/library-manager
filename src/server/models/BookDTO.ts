// Imports
import { IsNotEmpty, ValidateIf, IsNumberString } from "class-validator";

// DTO
export default class BookDTO {
    @IsNotEmpty({ message: "Title is a required field." })
    public title!: string;

    @IsNotEmpty({ message: "Author is a required field." })
    public author!: string;

    public genre?: string;

    @ValidateIf(o => !!o.year)
    @IsNumberString(
        { message: "Year must be a valid number." },
        {
            allowNaN: false,
            allowInfinity: false,
            maxDecimalPlaces: 0,
        }
    )
    public year?: string;
}
