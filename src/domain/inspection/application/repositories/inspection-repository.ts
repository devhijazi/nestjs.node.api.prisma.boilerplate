import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Inspection } from '../../enterprise/entities/inspection';

export abstract class InspectionRepository {
  abstract findById(id: UniqueEntityID): Promise<Inspection | null>;
  abstract findAll(): Promise<Inspection[]>;
  abstract create(inspection: Inspection): Promise<void>;
  abstract update(inspection: Inspection): Promise<void>;
  abstract delete(id: UniqueEntityID): Promise<void>;
}
