import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ChildCreated } from "../generated/schema"
import { ChildCreated as ChildCreatedEvent } from "../generated/Factory/Factory"
import { handleChildCreated } from "../src/factory"
import { createChildCreatedEvent } from "./factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let date = BigInt.fromI32(234)
    let param1 = "Example string value"
    let childAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newChildCreatedEvent = createChildCreatedEvent(
      date,
      param1,
      childAddress
    )
    handleChildCreated(newChildCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChildCreated created and stored", () => {
    assert.entityCount("ChildCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChildCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "date",
      "234"
    )
    assert.fieldEquals(
      "ChildCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param1",
      "Example string value"
    )
    assert.fieldEquals(
      "ChildCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "childAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
