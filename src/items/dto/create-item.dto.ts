import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';

export class CreateItemDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsBoolean()
  public: boolean;

  listing: CreateListingDto;
}
