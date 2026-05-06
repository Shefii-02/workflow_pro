<?php

namespace App\Models;

use app\Models\BaseModel;

class Invoice extends BaseModel
{
    protected $fillable = ['company_id','client_id','total_amount'];

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
}
