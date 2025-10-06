<?php

namespace Server\Models\Base;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class ApiModel extends Model
{


    public $apiReadBy = "id";

    public $apiPerPage = 100;

    public $apiOrder = "desc";

    public $apiOrderBy = "id";

    public $apiSearchBy = "id";

    public $apiSearchIcon = "default";


    public $modelResponse = [
        'status' => "200",
        'message' => '',
        'errors' => [],
        'data' => [],
    ];



    public function apiCreate($body)
    {
        $created = $this->create($body);

        $this->modelResponse['data'] = $created;

        return $this->modelResponse;
    }

    public function apiUpdate($body)
    {

        if (!isset($body['id'])) {
            $this->modelResponse['errors'] = ['id is required'];
            return $this->modelResponse;
        }


        $data = $this->where("id", $body['id'])->first();

        $data->update($body);

        $data = $this->where('id', $body['id'])->first();

        $this->modelResponse['data'] = $data;

        $this->modelResponse['message'] = "Updated";

        return $this->modelResponse;
    }

    public function apiDelete($body)
    {

        if (!isset($body['id'])) {
            $this->modelResponse['errors'] = ['id is required'];
            return $this->modelResponse;
        }

        $this->where("id", $body["id"])->delete();

        return $this->apiList();
    }


























    public function getListShape($paginator)
    {
        $paginator = $paginator->toArray();

        $paginator['object'] = Collection::make($paginator['data'])->keyBy($this->apiReadBy);

        $paginator['search_keys'] = $this->getSearchKeys();

        return $paginator;
    }

    public function getSearchKeys()
    {

        if (getenv("NODE_ENV") == "development" && $this->apiSearchIcon != "default") {
            return $this->all()->keyBy($this->apiSearchBy)->map(function ($item) {
                return "http://" . $_SERVER['HTTP_HOST'] . "/uploads/images/" . $item[$this->apiSearchIcon];
            });
        }


        if ($this->apiSearchIcon == "default") {
            return $this->all()->keyBy($this->apiSearchBy)->map(function ($item) {
                return "https://" . $_SERVER['HTTP_HOST'] . "/assets/images/pwa/android-chrome-36x36.png";
            });
        }

        return $this->all()->keyBy($this->apiSearchBy)->map(function ($item) {
            return "https://" . $_SERVER['HTTP_HOST'] . "/uploads/images/" . $item[$this->apiSearchIcon];
        });
    }

    public function apiList()
    {

        $paginator = $this->orderBy($this->apiOrderBy, $this->apiOrder)->paginate($this->apiPerPage);

        $data = $this->getListShape($paginator);

        $this->modelResponse['data'] = $data;

        return $this->modelResponse;
    }

    public function apiSearch($body)
    {

        if (!isset($body['search'])) {
            $this->modelResponse['errors'] = ['search term is required'];
            return $this->modelResponse;
        }

        $paginator = $this->where($this->apiSearchBy, 'LIKE', "%{$body['search']}%")->paginate($this->apiPerPage);

        $paginator = $paginator->toArray();

        $paginator['object'] = Collection::make($paginator['data'])->keyBy($this->apiReadBy);

        $paginator['search_keys'] = $this->getSearchKeys();

        $this->modelResponse['data'] = $paginator;

        return $this->modelResponse;
    }

    public function apiRead($attr)
    {
        $found = $this->where($this->apiReadBy, $attr)->first();

        if ($found) {
            $found = $this->relationships($found);
            $this->modelResponse['data'] = $found;
            return $this->modelResponse;
        }

        $this->modelResponse['errors'] = ['not found'];
        return $this->modelResponse;
    }










    protected function serializeDate($date)
    {
        return $date->format('Y-m-d H:i:s');
    }



}