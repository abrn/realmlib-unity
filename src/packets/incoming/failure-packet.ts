import { FailureCode } from '../../models';
import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received when an error has occurred
 */
export class FailurePacket implements Packet {

  readonly type = PacketType.FAILURE;

  /**
   * The error ID code of the failure
   */
  errorId: FailureCode;
  /**
   * A description of the error
   */
  errorDescription: string;
  /**
   * The place where the error occurred
   */
  errorPlace: string;
  /**
   * The ID of the connection in which the error occurred
   */
  errorConnectionId: string;

  constructor() {
    this.errorId = 0;
    this.errorDescription = '';
    this.errorPlace = '';
    this.errorConnectionId = '';
  }

  read(reader: Reader): void {
    this.errorId = reader.readInt32();
    this.errorDescription = reader.readString();
    this.errorPlace = reader.readString();
    this.errorConnectionId = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.errorId);
    writer.writeString(this.errorDescription);
    writer.writeString(this.errorPlace);
    writer.writeString(this.errorConnectionId);
  }

  toString(): string {
    return `[Failure - 0] Id: ${this.errorId} - Description: ${this.errorDescription}\n
    Place: ${this.errorPlace} - ConnectionId: ${this.errorConnectionId}`;
  }
}
