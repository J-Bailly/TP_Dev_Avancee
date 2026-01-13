import { Injectable } from '@nestjs/common';

@Injectable()
export class RankingCacheService {
  // Le cache stocke une liste de joueurs triée [cite: 58]
  private cachedRanking: any[] = [];

  setRanking(ranking: any[]) {
    this.cachedRanking = ranking;
  }

  getRanking() {
    return this.cachedRanking;
  }
}