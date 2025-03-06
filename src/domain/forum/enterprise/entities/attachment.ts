import { Entity } from "@/core/entitites/entity";
import { UniqueEntityID } from "@/core/entitites/unique-entity-id";

export interface AttachmentProps {
  title: string;
  Url: string;
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title;
  }

  get Url() {
    return this.props.Url
;
  }

  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}