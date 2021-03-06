import { SlotObjectData } from '../../../data';
import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';
import { Reader } from '../../../reader';
import { Writer } from '../../../writer';

/**
 * Sent to make an update to the pet currently following the player
 */
export class ReskinPetPacket implements Packet {

  readonly type = PacketType.PET_CHANGE_FORM_MSG;

  /**
   * The instance id of the pet to update
   */
  instanceId: number;
  /**
   * The pet type that the pet will become after the form change
   */
  newPetType: number;
  /**
   * The slot object of a pet stone if one is used
   */
  item: SlotObjectData;


  constructor() {
    this.instanceId = 0;
    this.newPetType = 0;
    this.item = new SlotObjectData();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.instanceId);
    writer.writeInt32(this.newPetType);
    this.item.write(writer);
  }

  read(reader: Reader): void {
    this.instanceId = reader.readInt32();
    this.newPetType = reader.readInt32();
    this.item.read(reader);
  }

  toString(): string {
    return `[ReskinPet - 53] InstanceId: ${this.instanceId} - NewPetType: ${this.newPetType} - Slot:\n${this.item.toString()}`;
  }
}
