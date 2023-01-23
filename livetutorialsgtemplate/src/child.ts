import {
  Initialized as InitializedEvent,
  MessageUpdated as MessageUpdatedEvent
} from "../generated/Child/Child"
import { Initialized, MessageUpdated } from "../generated/schema"

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageUpdated(event: MessageUpdatedEvent): void {
  let entity = new MessageUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.message = event.params.message
  entity.updatedMessageTally = event.params.updatedMessageTally

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
