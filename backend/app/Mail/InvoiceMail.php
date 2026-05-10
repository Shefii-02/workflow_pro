<?php

namespace App\Mail;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Invoice $invoice,
        public string $pdfPath,
        public string $subjectText,
        public ?string $bodyText,
        public ?string $meetingLink,
    ) {}

    public function build()
    {
        return $this
            ->subject($this->subjectText)
            ->view('emails.invoice')
            ->attach(
                storage_path(
                    'app/' . $this->pdfPath
                )
            );
    }
}
