import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { Initialized, MessageUpdated } from "../generated/Child/Child"

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createMessageUpdatedEvent(
  message: string,
  updatedMessageTally: BigInt
): MessageUpdated {
  let messageUpdatedEvent = changetype<MessageUpdated>(newMockEvent())

  messageUpdatedEvent.parameters = new Array()

  messageUpdatedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  messageUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedMessageTally",
      ethereum.Value.fromUnsignedBigInt(updatedMessageTally)
    )
  )

  return messageUpdatedEvent
}
