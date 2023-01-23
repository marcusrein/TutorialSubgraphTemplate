import { ChildCreated as ChildCreatedEvent } from "../generated/Factory/Factory";
import { ChildCreated } from "../generated/schema";
import { Child } from "../generated/templates";

export function handleChildCreated(event: ChildCreatedEvent): void {
	let entity = new ChildCreated(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.date = event.params.date;
	entity.param1 = event.params.param1;
	entity.childAddress = event.params.childAddress;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();

	Child.create(event.params.childAddress);
}
