import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingCacheService } from './ranking-cache/ranking-cache.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Player } from './players/entities/player.entity';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Player],
      synchronize: true, 
    }),
    EventEmitterModule.forRoot(),
    PlayersModule,
    MatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService, RankingCacheService],
})
export class AppModule {}