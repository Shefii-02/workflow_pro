<h1>Invoice</h1>

<p>
    Invoice:
    {{ $invoice->invoice_number }}
</p>

<p>
    Client:
    {{ $invoice->client->full_name }}
</p>

<hr>

<table width="100%" border="1" cellspacing="0" cellpadding="8">

    <tr>
        <th>Description</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total</th>
    </tr>

    @foreach($invoice->items as $item)

    <tr>
        <td>{{ $item->description }}</td>
        <td>{{ $item->quantity }}</td>
        <td>{{ $item->unit_price }}</td>
        <td>{{ $item->total }}</td>
    </tr>

    @endforeach

</table>

<h3>
    Grand Total:
    {{ $invoice->total_amount }}
</h3>
