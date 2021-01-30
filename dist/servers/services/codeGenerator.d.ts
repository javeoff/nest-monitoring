import { VkInitDto } from "src/app.service";
export declare class CodeGenerator {
    generateCode(vkInitDto: VkInitDto, serverIdDto: {
        id: number;
    }): {
        verifyCode: string;
    };
}
