<?php

namespace App\Entity;

use App\Repository\PlantRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PlantRepository::class)
 */
class Plant
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     */
    private $plantname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     */
    private $plantspecies;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlantname(): ?string
    {
        return $this->plantname;
    }

    public function setPlantname(string $plantname): self
    {
        $this->plantname = $plantname;

        return $this;
    }

    public function getPlantspecies(): ?string
    {
        return $this->plantspecies;
    }

    public function setPlantspecies(string $plantspecies): self
    {
        $this->plantspecies = $plantspecies;

        return $this;
    }
}
