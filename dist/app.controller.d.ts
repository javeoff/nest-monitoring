import { AppService } from './app.service';
import { VkInitDto } from './dto/VkInitDto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    initApp(vkInitDto: VkInitDto): any;
    getVerifyCode(vkInitDto: VkInitDto, serverIdDto: {
        id: number;
    }): boolean;
}
