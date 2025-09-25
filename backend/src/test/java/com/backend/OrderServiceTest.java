package com.backend;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.backend.domain.item.item.entity.Item;
import com.backend.domain.item.item.repository.ItemRepository;
import com.backend.domain.member.member.entity.Member;
import com.backend.domain.member.member.repository.MemberRepository;
import com.backend.domain.orderitem.orderitem.dto.OrderItemDto;
import com.backend.domain.orderitem.orderitem.entity.OrderItem;
import com.backend.domain.orders.orders.dto.OrdersDto;
import com.backend.domain.orders.orders.entity.Orders;
import com.backend.domain.orders.orders.repository.OrdersRepository;
import com.backend.domain.orders.orders.service.OrdersService;

import jakarta.transaction.Transactional;


@SpringBootTest
class OrdersServiceTest {

	@Autowired
	private OrdersService ordersService;

	@Autowired
	private OrdersRepository ordersRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Test
	@Transactional
	void createOrderTest() {
		Member member = new Member();
		//테스트하려면 member에 @Setter를 추가해야 데이터를 set할 수 있습니다.
		//member.setEmail("test@example.com");
		//member.setPassword("password");
		memberRepository.save(member);


		Item item = new Item();
		item.setName("상품A");
		item.setContent("설명");
		item.setPrice(1000);
		item.setStock(10);

		itemRepository.save(item);

		// 2. DTO 생성
		OrderItemDto orderItemDto = new OrderItemDto(item.getId(), 2);

		OrdersDto.OrdersCreateReqBody request =
			new OrdersDto.OrdersCreateReqBody(
				member.getEmail(),
				"테스트 주소",
				List.of(new OrdersDto.OrdersItemCreateReqBody(
					orderItemDto.getItemId(),
					orderItemDto.getQuantity()
				))
			);

		// 3. 서비스 호출
		//테스트 하려면 createOrder에 member 객체를 파라미터로 추가로 받아야 합니다.
		ordersService.createOrders(request);

		// 4. 결과 검증
		List<Orders> ordersList = ordersRepository.findAll();
		assertEquals(1, ordersList.size());
		Orders orders = ordersList.get(0);
		assertEquals("테스트 주소", orders.getAddress());
		assertEquals(1, orders.getOrderItems().size());
		assertEquals(2, orders.getOrderItems().get(0).getQuantity());
		assertEquals(item.getId(), orders.getOrderItems().get(0).getItem().getId());
	}

	@Test
	@Transactional
	void readOrdersTest() {
		// 1. 테스트용 회원 & 아이템 준비
		memberRepository.deleteAll();

		Member member = new Member();
		member.setEmail("test2@example.com");
		member.setPassword("password");
		memberRepository.save(member);

		Item item1 = new Item();
		item1.setName("상품A");
		item1.setPrice(1000);
		item1.setStock(10);
		itemRepository.save(item1);

		Item item2 = new Item();
		item2.setName("상품B");
		item2.setPrice(2000);
		item2.setStock(5);
		itemRepository.save(item2);

		// 2. 주문 생성
		Orders order1 = new Orders();
		order1.setAddress("주소1");
		order1.setMember(member);

		OrderItem orderItem1 = new OrderItem();
		orderItem1.setItem(item1);
		orderItem1.setQuantity(2);
		order1.addOrderItem(orderItem1);

		ordersRepository.save(order1);

		Orders order2 = new Orders();
		order2.setAddress("주소2");
		order2.setMember(member);

		OrderItem orderItem2 = new OrderItem();
		orderItem2.setItem(item2);
		orderItem2.setQuantity(1);
		order2.addOrderItem(orderItem2);

		ordersRepository.save(order2);

		// 3. 서비스 호출
		List<Orders> ordersList = ordersService.readOrders("test2@example.com");

		// 4. 검증
		assertEquals(2, ordersList.size());

		Orders firstOrder = ordersList.get(0);
		assertEquals("주소1", firstOrder.getAddress());
		assertEquals(1, firstOrder.getOrderItems().size());
		assertEquals(2, firstOrder.getOrderItems().get(0).getQuantity());
		assertEquals(item1.getId(), firstOrder.getOrderItems().get(0).getItem().getId());

		Orders secondOrder = ordersList.get(1);
		assertEquals("주소2", secondOrder.getAddress());
		assertEquals(1, secondOrder.getOrderItems().size());
		assertEquals(1, secondOrder.getOrderItems().get(0).getQuantity());
		assertEquals(item2.getId(), secondOrder.getOrderItems().get(0).getItem().getId());
	}
}