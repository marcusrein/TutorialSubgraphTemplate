import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { ChildCreated } from "../generated/Factory/Factory"

export function createChildCreatedEvent(
  date: BigInt,
  param1: string,
  childAddress: Address
): ChildCreated {
  let childCreatedEvent = changetype<ChildCreated>(newMockEvent())

  childCreatedEvent.parameters = new Array()

  childCreatedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )
  childCreatedEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromString(param1))
  )
  childCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "childAddress",
      ethereum.Value.fromAddress(childAddress)
    )
  )

  return childCreatedEvent
}
