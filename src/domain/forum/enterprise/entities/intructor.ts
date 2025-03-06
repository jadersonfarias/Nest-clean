import { randomUUID } from "crypto";
import { Entity } from "../../../../core/entitites/entity";
import { UniqueEntityID } from "../../../../core/entitites/unique-entity-id";
import { Student } from "./student";

interface IntructorProps {
  name: string;
}

export class Intructor extends Entity<IntructorProps> {
  static create(props: IntructorProps, id?: UniqueEntityID) {
    const intructor = new Intructor(props, id);

    return intructor;
  }
}
