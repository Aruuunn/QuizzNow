import { AuthGuard } from '@nestjs/passport';

export class JwtGaurd extends AuthGuard('jwt') {}

export default JwtGaurd;
