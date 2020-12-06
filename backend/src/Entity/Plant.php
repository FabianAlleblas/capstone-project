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
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank
     * @Assert\Length(max=28)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=50)     
     * @Assert\NotBlank
     * @Assert\Length(max=28)
     */
    private $species;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Assert\Length(max=28)
     */
    private $specialInfo;

    /**
     * @ORM\Column(type="datetime")
     *
     */
    private $lastWatered;

    /**
     * @ORM\Column(type="datetime")
     *
     */
    private $lastFertilized;
    
    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="plants")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * Virtual Property(type="integer")
     */
    private $daysLeft;

    /**
     * Virtual Property(type="integer")
     */
    private $weeksLeft;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSpecies(): string
    {
        return $this->species;
    }

    public function setSpecies(string $species): self
    {
        $this->species = $species;

        return $this;
    }

    public function getSpecialInfo(): ?string
    {
        return $this->specialInfo;
    }

    public function setSpecialInfo(string $specialInfo): self
    {
        $this->specialInfo = $specialInfo;

        return $this;
    }

    public function getLastWatered(): ?\DateTimeInterface
    {
        return $this->lastWatered;
    }

    public function setLastWatered(?\DateTimeInterface $lastWatered): self
    {
        $this->lastWatered = $lastWatered;

        return $this;
    }

    public function getLastFertilized(): ?\DateTimeInterface
    {
        return $this->lastFertilized;
    }
    
    public function setLastFertilized(?\DateTimeInterface $lastFertilized): self
    {
        $this->lastFertilized = $lastFertilized;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getDaysLeft(): ?int
    {
        return $this->daysLeft;
    }

    public function setDaysLeft(int $daysLeft): self
    {
        $this->daysLeft = $daysLeft;

        return $this;
    }
    
    public function getWeeksLeft(): ?int
    {
        return $this->weeksLeft;
    }

    public function setWeeksLeft(int $weeksLeft): self
    {
        $this->weeksLeft = $weeksLeft;

        return $this;
    }
}
