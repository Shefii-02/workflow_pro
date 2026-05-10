<?php

namespace App\Models;



class InvoiceItem extends BaseModel
{
    protected $fillable = ['invoice_id','description'];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
