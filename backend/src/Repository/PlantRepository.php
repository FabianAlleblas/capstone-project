<?php

namespace App\Repository;

use App\Entity\Plant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Plant|null find($id, $lockMode = null, $lockVersion = null)
 * @method Plant|null findOneBy(array $criteria, array $orderBy = null)
 * @method Plant[]    findAll()
 * @method Plant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlantRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Plant::class);
    }

    public function savePlant(Plant $plant): Plant {
        $this->_em->persist($plant);
        $this->_em->flush();
        return $plant;
    }

    public function deletePlant(Plant $plant): void {
        $this->_em->remove($plant);
        $this->_em->flush();
    }

    public function convertDate(Plant $plant): Plant {
        $today = new \Datetime();

        $lastWatered = $plant->getLastWatered();
        $lastFertilized = $plant->getLastFertilized();

        $daysLeft = 10 - intval(date_diff($lastWatered, $today)->format('%a'));
        $weeksLeft = (28 - intval(date_diff($lastFertilized, $today)->format('%a'))) / 7;

        if($daysLeft <= 0){
            $daysLeft = 0;
        }
        if($weeksLeft <= 0){
            $weeksLeft = 0;
        }
        
        $plant->setDaysLeft(ceil($daysLeft));
        $plant->setWeeksLeft(ceil($weeksLeft));

        return $plant;
    }

    // /**
    //  * @return Plant[] Returns an array of Plant objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Plant
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
