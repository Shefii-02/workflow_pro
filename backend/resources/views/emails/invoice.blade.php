<h2>
    {{ $subjectText }}
</h2>

<p>
    {!! nl2br($bodyText) !!}
</p>

@if($meetingLink)

<p>
    Meeting:
    <a href="{{ $meetingLink }}">
        {{ $meetingLink }}
    </a>
</p>

@endif

<hr>

<p>
    Invoice Number:
    {{ $invoice->invoice_number }}
</p>

<p>
    Total:
    {{ $invoice->total_amount }}
</p>
