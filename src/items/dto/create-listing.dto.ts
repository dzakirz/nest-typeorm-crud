import { IsNumber, IsString } from 'class-validator';

export class CreateListingDto {
  @IsString()
  description;

  @IsNumber()
  rating;
}
