import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  // Crée un nouveau joueur 
  async create(id: string): Promise<Player> {
    // Vérifie existance 
    const existingPlayer = await this.playerRepository.findOne({ where: { id } });
    if (existingPlayer) {
      throw new ConflictException('Le joueur existe déjà');
    }

    // Calculer l'elo initial 
    const allPlayers = await this.playerRepository.find();
    // Valeur par défaut si aucun joueur
    let initialRank = 1500; 

    if (allPlayers.length > 0) {
      const sum = allPlayers.reduce((acc, p) => acc + p.rank, 0);
      initialRank = sum / allPlayers.length;
    }

    // Sauvegarder le nouveau joueur 
    const newPlayer = this.playerRepository.create({
      id: id,
      rank: initialRank,
    });

    return this.playerRepository.save(newPlayer);
  }

  // Récupère tous les joueurs triés par classement
  async findAll(): Promise<Player[]> {
    return this.playerRepository.find({
      order: { rank: 'DESC' },
    });
  }

  // Utile pour la future logique des matchs.
  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOne({ where: { id } });
  }

  // Met à jour le rang d'un joueur
  async updateRank(id: string, newRank: number): Promise<void> {
    await this.playerRepository.update(id, { rank: newRank });
  }
}