<script>
	import { flip } from 'svelte/animate';
	
	let baskets = [
    {
      "name": "Row 1",
      "items": ["Item 1", "Item 2"]
    },
    {
      "name": "Row 2",
      "items": ["Item 3", "Item 4"]
    },
		{
      "name": "Row 3",
      "items": ["Item 5", "Item 6", "Item 7"]
    }
  ];
	
	let hoveringOverBasket;
	
	function dragStart(event, basketIndex, itemIndex) {
		// The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
		const data = {basketIndex, itemIndex};
   	event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
	function drop(event, basketIndex) {
		event.preventDefault();
    const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);
		
		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
		const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);
		
    // Add the item to the drop target basket.
		baskets[basketIndex].items.push(item);
		baskets = baskets;
		
		hoveringOverBasket = null;
	}
</script>

{#each baskets as basket, basketIndex (basket)}
  <div animate:flip>
    <b>{basket.name}</b>
    <ul
	  	class:hovering={hoveringOverBasket === basket.name}
	    on:dragenter={() => hoveringOverBasket = basket.name}
      on:dragleave={() => hoveringOverBasket = null}
  		on:drop={event => drop(event, basketIndex)}
  		ondragover="return false"
    >
	    {#each basket.items as item, itemIndex (item)}
			  <div class="item" animate:flip>
	      	<li
	    	    draggable={true}
		  		  on:dragstart={event => dragStart(event, basketIndex, itemIndex)}
		    	>
		      	{item}
	    	  </li>
			  </div>
	    {/each}
    </ul>
  </div>
{/each}

<style>
	.hovering {
		border-color: orange;
	}
	.item {
		display: inline; /* required for flip to work */
	}
	li {
		background-color: rgb(255, 255, 255);
    color: #000;
		cursor: pointer;
		display: inline-block;
		margin-right: 10px;
		padding: 10px;
	}
  ul {
		border: solid lightgray 1px;
		display: flex; /* required for drag & drop to work when .item display is inline */
		height: 40px; /* needed when empty */
		padding: 10px;
	}
</style>