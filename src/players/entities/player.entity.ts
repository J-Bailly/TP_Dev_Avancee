import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  id: string; // L'identifiant unique du joueur [cite: 45, 216]

  @Column({ type: 'float' })
  rank: number; // Le classement Elo [cite: 46, 216]
}