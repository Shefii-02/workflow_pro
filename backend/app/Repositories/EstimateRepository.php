<?php

namespace App\Repositories;

use App\Models\ProjectEstimate;

class EstimateRepository
{
    public function create(array $data)
    {

        return ProjectEstimate::create($data);
    }

    public function update(
        ProjectEstimate $estimate,
        array $data
    ) {
        $estimate->update($data);

        return $estimate;
    }

    public function delete(
        ProjectEstimate $estimate
    ) {
        return $estimate->delete();
    }
}
