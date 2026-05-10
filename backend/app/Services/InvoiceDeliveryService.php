<?php

namespace App\Services;

use App\Mail\InvoiceMail;
use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class InvoiceDeliveryService
{
    /*
    |--------------------------------------------------------------------------
    | PDF
    |--------------------------------------------------------------------------
    */

    public function generatePdf(
        Invoice $invoice
    ) {

        $pdf = Pdf::loadView(
            'pdf.invoice',
            [
                'invoice' => $invoice
                    ->load([
                        'items',
                        'client',
                    ]),
            ]
        );

        $path = 'invoices/' .
            $invoice->id .
            '.pdf';

        Storage::put(
            $path,
            $pdf->output()
        );

        return $path;
    }

    /*
    |--------------------------------------------------------------------------
    | EMAIL
    |--------------------------------------------------------------------------
    */

    public function sendEmail(
        Invoice $invoice,
        array $data
    ) {

        $pdfPath = $this->generatePdf(
            $invoice
        );

        Mail::to(

            $data['email']
                ?? $invoice->client->email

        )->send(

            new InvoiceMail(

                invoice: $invoice,

                pdfPath: $pdfPath,

                subject: $data['subject']
                    ?? 'Invoice',

                body: $data['body']
                    ?? null,

                meetingLink: $data['meeting_link']
                    ?? null,
            )
        );

        return true;
    }

    /*
    |--------------------------------------------------------------------------
    | WHATSAPP
    |--------------------------------------------------------------------------
    */

    public function sendWhatsapp(
        Invoice $invoice,
        array $data
    ) {

        $pdfPath = $this->generatePdf(
            $invoice
        );

        $fileUrl = asset(
            'storage/' . $pdfPath
        );

        return Http::withToken(
            env('WHATSAPP_TOKEN')
        )->post(

            env('WHATSAPP_API')
                . '/'
                . env('WHATSAPP_PHONE_ID')
                . '/messages',

            [

                'messaging_product'
                => 'whatsapp',

                'to'
                => $data['phone']
                    ?? $invoice->client->phone,

                'type'
                => 'template',

                'template' => [

                    'name'
                    => 'invoice_send',

                    'language' => [
                        'code' => 'en'
                    ],

                    'components' => [

                        [
                            'type' => 'body',

                            'parameters' => [

                                [
                                    'type' => 'text',

                                    'text'
                                    => $invoice->invoice_number
                                ],

                                [
                                    'type' => 'text',

                                    'text'
                                    => $invoice->total_amount
                                ]
                            ]
                        ],

                        [
                            'type' => 'button',

                            'sub_type' => 'url',

                            'index' => 0,

                            'parameters' => [

                                [
                                    'type' => 'text',

                                    'text' => $fileUrl
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        )->json();
    }
    /*
    |--------------------------------------------------------------------------
    | MARK PAID
    |--------------------------------------------------------------------------
    */

    public function markPaid(
        Invoice $invoice,
        array $data
    ) {

        $invoice->update([

            'status'
            => 'paid',

            'paid_date'
            => now(),

            'payment_method'
            => $data['payment_method']
                ?? null,
        ]);

        return $invoice;
    }
}
