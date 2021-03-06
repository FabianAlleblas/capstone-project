<?php

namespace App\Entity;

use App\Repository\PlantRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PlantRepository::class)
 * @Vich\Uploadable
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
     * @ORM\Column(type="integer")
     * @Assert\Positive
     * @Assert\Range(
     *      min = 1,
     *      max = 99,)
     */
    private $waterInterval;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Positive
     * @Assert\Range(
     *      min = 1,
     *      max = 99,)
     */
    private $fertilizerInterval;

    /**
     * VirtualProperty(type="integer")
     */
    private $daysLeft;

    /**
     * VirtualProperty(type="integer")
     */
    private $weeksLeft;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @var string
     */
    private $image;

    /**
     * @Assert\File(
     *      maxSize = "5M",
     *      mimeTypes = {"image/png", "image/jpg", "image/jpeg"})  
     * @Vich\UploadableField(mapping="product_images", fileNameProperty="image")
     * @var File
     */
    private $imageFile;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @var \DateTime
     */
    private $updatedAt;

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

    public function getWaterInterval(): ?int
    {
        return $this->waterInterval;
    }

    public function setWaterInterval(int $waterInterval): self
    {
        $this->waterInterval = $waterInterval;

        return $this;
    }

    public function getFertilizerInterval(): ?int
    {
        return $this->fertilizerInterval;
    }

    public function setFertilizerInterval(int $fertilizerInterval): self
    {
        $this->fertilizerInterval = $fertilizerInterval;

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

    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

        if ($image)
        {
            $this->updatedAt = new \DateTime('now');
        }
    }

    public function getImageFile()
    {
        return $this->imageFile;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function getImage()
    {
        return $this->image;
    }
}
