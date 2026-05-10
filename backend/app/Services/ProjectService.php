<?php
namespace App\Services;

use App\Repositories\ProjectRepository;
use Illuminate\Support\Facades\Auth;

class ProjectService
{
    protected $repo;

    public function __construct(ProjectRepository $repo)
    {
        $this->repo = $repo;
    }

    protected function companyId()
    {
        return Auth::user()->company_id;
    }

    public function list()
    {
        return $this->repo->list($this->companyId());
    }

    public function get($id)
    {
        return $this->repo->find($id, $this->companyId());
    }

    public function create(array $data)
    {
        $data['company_id'] = $this->companyId();
        $data['created_by'] = Auth::id();

        return $this->repo->create($data);
    }

    public function update($id, array $data)
    {
        $project = $this->get($id);
        return $this->repo->update($project, $data);
    }

    public function delete($id)
    {
        $project = $this->get($id);
        return $this->repo->delete($project);
    }
}
