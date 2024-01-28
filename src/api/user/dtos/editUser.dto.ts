import { OmitType, PartialType } from "../../../common/helpers/dto.helper";
import { createUserDto } from "./";

export class editUserDto extends PartialType(OmitType(createUserDto, [])) {

} 