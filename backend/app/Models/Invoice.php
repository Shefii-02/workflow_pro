<?php

namespace App\Models;



class Invoice extends BaseModel
{
    protected $fillable = ['company_id', 'client_id', 'total_amount','invoice_number'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function estimate()
    {
        return $this->belongsTo(
            ProjectEstimate::class,
            'estimate_id'
        );
    }
}
