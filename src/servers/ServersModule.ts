import { Module } from "@nestjs/common";
import { ServersController } from "./controllers/ServersController";
import { ServersCreator } from "./services/serversCreator";
import { ServersFinder } from "./services/serversFinder";

@Module({
    providers: [
        ServersCreator,
        ServersFinder,
    ],
    controllers: [
        ServersController
    ]
})
export class ServersModule {
}