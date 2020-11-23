import { Connection } from 'typeorm';
export declare class UserService {
    private readonly connection;
    private userRepo;
    private logger;
    constructor(connection: Connection);
    findByEmail: (email: string, relations?: string[]) => Promise<import("./user.entity").default>;
}
