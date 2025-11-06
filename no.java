package recuperacion;

import java.util.Random;
import java.util.Scanner;

public class Practica {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.print("Cuantos dados quieres: ");
		int dados = scanner.nextInt();
		
		Random random = new Random();
		
		int[] fre = new int[7];
		
		boolean todosIguales = false;
		int tiradas = 0;
		int resultados[] = new int[dados];


				do {
					tiradas++;
					for(int i=0; i<dados; i++) {
						int dado = (int)(Math.random()*6)+1;
						fre[dado]++;
						resultados[i] = dado;
						if(i== dados-1)
							System.out.println(dado);
						else
							System.out.print(dado + " - ");
					}
					todosIguales = true;
					for(int j=1; j<dados; j++) {
						if(resultados[0] != resultados[j])
							todosIguales = false;
						
					}
					
				}while(todosIguales == false);
				
				for(int k =1; k<=6; k++) {
					System.out.printf("El número %d ha salido el %.2f de la veces\n", 
							k, (double)(100*fre[k])/(dados*tiradas));
				}
				
				
				System.out.println("He tenido que lanzar los dados " + tiradas + " veces para que todos sean iguales");
	}
}
